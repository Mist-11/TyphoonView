import json
import msvcrt
import re
from collections import defaultdict
import requests
import time
import pandas as pd
import mysql.connector
from django.http import JsonResponse
import os

conn = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="123456",
    database="Typhoon"
)
cursor = conn.cursor()


def tianchong(x, y):  # 自动相关信息，填充列表，匹配dataframe的
    a = list()
    for i in range(x.shape[0]):  # 与查询结果行数相匹配的列表，填充相应内容
        a.append(y)
    return a


def get_html(headers, year):
    t = int(round(time.time() * 1000))
    url = "http://typhoon.nmc.cn/weatherservice/typhoon/jsons/list_%s?t=%s&callback=typhoon_jsons_list_%s" % (
        str(year), t, str(year))
    db = conn.cursor()  # 获取游标
    html_obj = requests.get(url, headers=headers, verify=False).text
    date = json.loads(re.match(".*?({.*}).*", html_obj, re.S).group(1))['typhoonList']
    item_list = []
    for v in date:
        item = {}
        item['id'] = v[0]
        item['year'] = '20' + v[4][0:2]
        item['YearNo'] = '%s' % v[4]
        item['ChineseName'] = '%s' % v[2]
        item['EnglishName'] = '%s' % v[1]
        item['dec'] = '%s' % v[6]
        item_list.append(item)
    for i in item_list:
        if i['year'] != ' 0' or i['year'] != '2000':
            try:
                sqlstr = 'INSERT INTO 台风汇总信息 VALUES (' + "'" + str(i['id']) + "'" + ',' + "'" + str(
                    i['year']) + "'" + "," + "'" + str(i['YearNo']) + "'" + ',' + "'" + str(
                    i['ChineseName']) + "'" + ',' + "'" + str(i['EnglishName']) + "'" + ',' + "'" + str(
                    i['dec']) + "'" + ')'
                db.execute(sqlstr)
            except:
                continue
    conn.commit()  # 提交数据
    return item_list


def millisecond_to_time(millis):
    """13位时间戳转换为日期格式字符串"""
    return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(millis / 1000))


def rep(rawstr, dict_rep):
    for i in dict_rep:
        rawstr = rawstr.replace(i, dict_rep[i])
    return rawstr


def get_xiang(item, headers):
    db = conn.cursor()  # 获取游标
    for i in range(len(item)):
        print("开始抓取%s 台风信息, id: %s" % (item[i]['ChineseName'], item[i]['id']))
        t = int(round(time.time() * 1000))
        url = 'http://typhoon.nmc.cn/weatherservice/typhoon/jsons/view_%s?t' \
              '=%s&callback=typhoon_jsons_view_2297801' % (item[i]['id'], t)
        html_obj = requests.get(url, headers=headers, verify=False).text
        date = json.loads(re.match(".*?({.*}).*", html_obj, re.S).group(1))['typhoon']
        # 建立字典
        info_dicts = defaultdict(list)
        for v in date[8]:
            # print(v)
            info_dicts['id'].append(item[i]['id'])
            info_dicts['name'].append(item[i]['ChineseName'])
            # 时间  时间戳转日期
            info_dicts['时间'].append(millisecond_to_time(v[2]))
            info_dicts['风速'].append('%sm/s' % v[7])
            yi = '%s' % v[8]
            # 东:East,缩写成E; 2、南:South,缩写成S; 3、西:West,缩写成W; 4、北:North
            info_dicts['移向'].append(yi.replace('N', '北').replace('E', '东').replace('S', '南').replace('W', '西'))
            # 强度
            word = {'SuperTY': '超强台风', 'STS': '强热带风暴', 'STY': '强台风', 'TC': '热带气旋', 'TD': '热带低压',
                    'TS': '热带风暴', 'TY': '台风', }
            info_dicts['强度'].append(rep(v[3], word))
            info_dicts['中心位置'].append('%sN/%sE' % (v[5], v[4]))
            info_dicts['中心气压'].append('%s百帕' % v[6])
            info_dicts['年份'].append(millisecond_to_time(v[2])[:4])
        data = pd.DataFrame(info_dicts)
        # print(data)
        data["No"] = ""
        a = list()
        for index1, row1 in data.iterrows():
            row1["No"] = str(row1['id']) + row1['时间']
            a.append(row1['No'])
        data["No"] = a
        for index2, row2 in data.iterrows():
            try:
                sqlstr = 'INSERT INTO 台风路径 VALUES (' + "'" + str(row2['No']) + "'" + ',' + "'" + str(
                    row2['id']) + "'" + ',' + "'" + str(row2['name']) + "'" + ',' + "'" + str(
                    row2['时间']) + "'" + ',' + "'" + str(row2['风速']) + "'" + ',' + "'" + str(
                    row2['移向']) + "'" + ',' + "'" + str(row2['强度']) + "'" + ',' + "'" + str(
                    row2['中心位置']) + "'" + ',' + "'" + str(row2['中心气压']) + "'" + "," + "'" + str(
                    row2['年份']) + "'" + ')'
                # print(sqlstr)
                db.execute(sqlstr)
            except:
                print("出错")
                continue
    conn.commit()  # 提交数据
    return data


def goodway(year, tf_id):
    sqlstr = "SELECT id,name,时间,风速,移向,强度,中心位置,中心气压,年份 " \
             "from 台风路径 " \
             "where 台风路径.年份 = " + "'" + str(year) + "'" \
             "and id = " + "'" + str(tf_id) + "'"
    result = pd.read_sql(sqlstr, conn)
    # print(result)
    result = result.rename(
        columns={'时间': 'time', '风速': 'speed', '移向': 'move', '强度': 'strength', '中心位置': 'position',
                 '中心气压': 'pressure', '年份': 'year'})
    # 将position列分割成jingdu和weidu两列
    result[['weidu', 'jingdu']] = result['position'].str.split('/', expand=True)
    # 将position列分割成weidu和jindu两列
    result[['weidu', 'jindu']] = result['position'].str.split('/', expand=True)
    # 对weidu和jindu列进行清洗
    result['weidu'] = result['weidu'].str.replace('N', '').astype(float)
    result['jindu'] = result['jindu'].str.replace('E', '').astype(float)
    # 删除position列
    result = result.drop('position', axis=1)
    # print(result)
    d = result.to_dict('index')
    new_dict = {}
    for key, value in d.items():
        id_value = value['id']
        if id_value not in new_dict:
            new_dict[id_value] = {}  # 如果id不在新字典中，则创建一个新的键值对
        new_dict[id_value][key] = value  # 将原字典中的键值对添加到新字典中对应的id键下面的子字典中
    # print(new_dict)
    return JsonResponse(new_dict, json_dumps_params={'ensure_ascii': False})


def getlist(year):
    sqlstr = "SELECT * from 台风汇总信息 where 年份=" + "'" + str(year) + "'"
    result = pd.read_sql(sqlstr, conn)
    result = result.rename(
        columns={'台风编号': 'id', '年份': 'year', '年份编号': 'YearNo', '中文名': 'Cname', '英文名': 'Ename',
                 '描述': 'dec'})
    d = result.to_dict(orient='index')
    return JsonResponse(d, json_dumps_params={'ensure_ascii': False})


def data2022to2023():
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/'
                  'apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/'
                      '111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
    }

    for i in range(2010, 2023):
        get_xiang(get_html(headers, i), headers)


def data2023():
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/'
                  'apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/'
                      '111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
    }
    a = 0
    while True:
        a += 1
        print("执行第" + str(a) + "次爬取")
        try:
            get_xiang(get_html(headers, 2023), headers)
            print("爬取成功")
            time.sleep(600)
        except:
            print("未有新数据，爬取失败")
            time.sleep(600)


