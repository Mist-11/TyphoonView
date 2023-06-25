import json
import re
import time
import requests
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
import pandas as pd
import pymssql
import numpy as np


def index(request):
    return render(request, 'index.html')


def rank(request):  # 10-至今年台风登入我国各地排名
    conn = pymssql.connect(host='localhost', port='1433', user='sa', password='123456', database='Typhoon')
    sqlstr = "SELECT place from 台风登陆记录"
    result = pd.read_sql(sqlstr, conn)
    result = result.applymap(lambda x: x.encode('latin1').decode('gbk') if isinstance(x, str) else x)
    # print(result)
    result_dict = result["place"].value_counts().to_dict()
    # print(result_dict)
    conn.close()
    return JsonResponse(result_dict, json_dumps_params={'ensure_ascii': False})


def variety(request):  # 10-至今年台风种类
    conn = pymssql.connect(host='localhost', port='1433', user='sa', password='123456', database='Typhoon')
    sqlstr = "SELECT id,强度 from 台风路径"
    result = pd.read_sql(sqlstr, conn)
    result = result.applymap(lambda x: x.encode('latin1').decode('gbk') if isinstance(x, str) else x)
    counts = result.groupby('id')['强度'].apply(lambda x: x.value_counts().index[0]).reset_index()
    counts.columns = ['id', '强度']
    result1 = counts['强度'].value_counts().to_dict()
    # print(result)
    conn.close()
    return JsonResponse(result1, json_dumps_params={'ensure_ascii': False})


def month(request):  # 10-至今年台风生成月份数量
    conn = pymssql.connect(host='localhost', port='1433', user='sa', password='123456', database='Typhoon')
    sqlstr = "SELECT id,时间 from 台风路径"
    result = pd.read_sql(sqlstr, conn)
    result['时间'] = pd.to_datetime(result['时间'])
    # 对 id 分组，然后对每个分组的时间列求最小值，最后取出月份
    result = result.groupby('id')['时间'].apply(lambda x: x.min().month).reset_index()
    result.columns = ['id', 'month']
    result = result['month'].value_counts().to_dict()
    # print(result)
    conn.close()
    return JsonResponse(result, json_dumps_params={'ensure_ascii': False})


def peoplenum(request):  # 10-至今年每年台风造成死亡人数
    conn = pymssql.connect(host='localhost', port='1433', user='sa', password='123456', database='Typhoon')
    sqlstr = "SELECT 年份,数值 from 台风相关数据表 where 数据名称 = '死亡或失踪人数'"
    result = pd.read_sql(sqlstr, conn)
    result = result.set_index('年份')['数值'].to_dict()
    # print(result)
    conn.close()
    return JsonResponse(result, json_dumps_params={'ensure_ascii': False})


def moneynum(request):  # 10-至今年每年台风造成至今经济损失
    conn = pymssql.connect(host='localhost', port='1433', user='sa', password='123456', database='Typhoon')
    sqlstr = "SELECT 年份,数值 from 台风相关数据表 where 数据名称 = '直接经济损失'"
    result = pd.read_sql(sqlstr, conn)
    result = result.set_index('年份')['数值'].to_dict()
    # print(result)
    conn.close()
    return JsonResponse(result, json_dumps_params={'ensure_ascii': False})


def yearnum(request):  # 10-至今年台风生成台风数量
    conn = pymssql.connect(host='localhost', port='1433', user='sa', password='123456', database='Typhoon')
    sqlstr = "SELECT time,name from 台风登陆记录"
    result = pd.read_sql(sqlstr, conn)
    result = result.applymap(lambda x: x.encode('latin1').decode('gbk') if isinstance(x, str) else x)
    result['time'] = result['time'].str.slice(stop=4).astype(int)
    result.drop_duplicates(subset=['time', 'name'], inplace=True)
    result = result.groupby('time')['time'].count().to_dict()
    # print(result)
    conn.close()
    return JsonResponse(result, json_dumps_params={'ensure_ascii': False})


def money_mean(request):  # 10-至今年台风每年平均每个台风造成直接经济损失
    conn = pymssql.connect(host='localhost', port='1433', user='sa', password='123456', database='Typhoon')
    sqlstr = "SELECT 年份,数值 from 台风相关数据表 where 数据名称 = '直接经济损失'"
    result1 = pd.read_sql(sqlstr, conn)
    result1.columns = ['time', 'num']
    sqlstr = "SELECT time,name from 台风登陆记录"
    result2 = pd.read_sql(sqlstr, conn)
    result2 = result2.applymap(lambda x: x.encode('latin1').decode('gbk') if isinstance(x, str) else x)
    result2['time'] = result2['time'].str.slice(stop=4).astype(int)
    result2.drop_duplicates(subset=['time', 'name'], inplace=True)
    result2 = result2.groupby('time')['time'].count().to_frame().rename(columns={'time': 'num'}).reset_index()
    result = pd.merge(result1, result2, on='time')
    result['mean'] = round(result['num_x'].div(result['num_y']), 1)
    result = result.drop(['num_x', 'num_y'], axis=1)
    result = result.set_index('time')['mean'].to_dict()
    conn.close()
    # print(result)
    return JsonResponse(result, json_dumps_params={'ensure_ascii': False})


def people_mean(request):  # 10-至今年台风每年平均每个台风造成人员伤亡
    conn = pymssql.connect(host='localhost', port='1433', user='sa', password='123456', database='Typhoon')
    sqlstr = "SELECT 年份,数值 from 台风相关数据表 where 数据名称 = '死亡或失踪人数'"
    result1 = pd.read_sql(sqlstr, conn)
    result1.columns = ['time', 'num']
    sqlstr = "SELECT time,name from 台风登陆记录"
    result2 = pd.read_sql(sqlstr, conn)
    result2 = result2.applymap(lambda x: x.encode('latin1').decode('gbk') if isinstance(x, str) else x)
    result2['time'] = result2['time'].str.slice(stop=4).astype(int)
    result2.drop_duplicates(subset=['time', 'name'], inplace=True)
    result2 = result2.groupby('time')['time'].count().to_frame().rename(columns={'time': 'num'}).reset_index()
    result = pd.merge(result1, result2, on='time')
    result['mean'] = round(result['num_x'].div(result['num_y']), 1)
    result = result.drop(['num_x', 'num_y'], axis=1).set_index('time')['mean'].to_dict()
    conn.close()
    # print(result)
    return JsonResponse(result, json_dumps_params={'ensure_ascii': False})


def Intensity(request):  # 10-至今年台风每年台风强度
    conn = pymssql.connect(host='localhost', port='1433', user='sa', password='123456', database='Typhoon')
    sqlstr = "SELECT id,时间,风速 from 台风路径"
    result = pd.read_sql(sqlstr, conn)
    result['year'] = pd.DatetimeIndex(result['时间']).year
    result = result.groupby(['year', 'id']).agg({'风速': 'max'}).reset_index()[['year', 'id', '风速']]
    result["风速"] = pd.to_numeric(result["风速"].str.replace("m/s", ""), errors="coerce")
    result = round(result.groupby('year')['风速'].mean(), 2).to_dict()
    # 设置分界点和对应标签
    bins = [0.0, 0.2, 1.5, 3.3, 5.4, 7.9, 10.7, 13.8, 17.1, 20.7, 24.4, 28.4, 32.6, 36.9, 41, 45, 51, 59, 61.2, 100000]
    labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
    for year, avg_speed in result.items():
        level_index = np.digitize(avg_speed, bins)
        result[year] = labels[level_index - 1]  # 注意index从1开始
    # print(result)
    conn.close()
    return JsonResponse(result, json_dumps_params={'ensure_ascii': False})


def dacause(request):
    return render(request, 'dacause.html')


def knowledge(request):
    return render(request, 'knowledge.html')


def rain24h(request):
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/'
                  'apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/'
                      '111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
    }
    t = int(round(time.time() * 1000))
    url = "http://typhoon.nmc.cn/weatherservice/diamond14/rainfall/24.json?t=%s&callback=diamond14_rainfall_24_json" % t
    # print(url)
    html_obj = requests.get(url, headers=headers, verify=False).text
    # print(html_obj)
    obj = json.loads(re.match(".*?({.*}).*", html_obj, re.S).group(1))['contours']

    data = []
    for i in range(len(obj)):
        temp2 = []
        for j in range(len(obj[i]['latAndLong'])):
            if j != len(obj[i]['latAndLong']) - 1:
                temp1 = [obj[i]['latAndLong'][j], obj[i]['latAndLong'][j + 1]]
            else:
                temp1 = [obj[i]['latAndLong'][j], obj[i]['latAndLong'][0]]
            temp2.append(temp1)
        data.append(temp2)

    response_data = {}
    # 将数据分别赋值给不同变量，同时将数据转换为JSON字符串
    for i in range(len(obj)):
        locals()[f'json_data{i}'] = json.dumps(data[i])
        response_data[f'json_data{i}'] = locals()[f'json_data{i}']

        # print(response_data)
        # 发送响应
        return HttpResponse(json.dumps(response_data), content_type="application/json")
