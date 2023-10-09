#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import GoodWay
import multiprocessing
import threading

sys.path.append(r'C:\Users\Mist\Desktop\2023中国计算机设计大赛\code\ViewTyphoon')
sys.path.append(r'C:\Users\Mist\Desktop\2023中国计算机设计大赛\code')
sys.path.append(r'C:\Users\Mist\Desktop\2023中国计算机设计大赛\code\ViewTyphoon\ViewTyphoon')


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ViewTyphoon.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHON PATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


flag = 1  # 0初始模式，1实时模式，2怀旧模式

if __name__ == '__main__':
    if flag == 0:
        from GoodWay import data2022to2023
        data2022to2023()
        p1 = multiprocessing.Process(target=main)
        p2 = multiprocessing.Process(target=GoodWay.data2023)
        p1.start()
        p2.start()
        p1.join()
        p2.join()
    if flag == 1:
        p1 = multiprocessing.Process(target=main)
        p2 = multiprocessing.Process(target=GoodWay.data2023)
        p1.start()
        p2.start()
        p1.join()
        p2.join()
    if flag == 2:
        main()
