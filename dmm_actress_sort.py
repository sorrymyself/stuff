#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import os
import shutil
from bs4 import BeautifulSoup
import requests
import time


def mkdir(path):
    folder = os.path.exists(path)
    if not folder:
        os.makedirs(path)


def dmm_search(file):

    search_url = 'https://www.dmm.co.jp/search/=/searchstr='

    if file == 'wanz841':
        PN = 'wanz841'
    else:
        PN = os.path.splitext(file)[0].lower()
        PN = PN.replace('-c', '')
        PN = PN.replace('-', '')
        PN = PN.replace('_', '')
        PN = PN.replace(' ', '')
        print(PN)

    while True:
        try:
            response1 = requests.get(search_url + PN)
            break
        except:
            print('Proxy Down? Retrying...')
            if not test():
                print('Bad IP, Can\'t get dmm infos, change IP and hit ENTER')
                input()

    soup1 = BeautifulSoup(response1.text, 'html.parser')
    a = soup1.select('ul#list li:last-child .tmb a')
    try:
        link = a[0]['href']
    except:
        return 'none'
    # print(link)

    while True:
        try:
            response2 = requests.get(link)
            break
        except:
            print('Proxy Down? Retrying...')
            if not test():
                print('Bad IP, Can\'t get dmm infos, change IP and hit ENTER')
                input()

    soup2 = BeautifulSoup(response2.text, 'html.parser')
    a2 = soup2.select('#performer a')
    try:
        actress = a2[0].get_text()
    except:
        actress = 'none'
    return actress


def test():
    if dmm_search('wanz841') == '佐久間恵美':
        return True
    else:
        return False


def rmdir(path):

    if path == os.path.join(main_dir, unsorted):
        return None

    for root, dirs, files in os.walk(path):
        for file in files:
            if file.lower().endswith(ext):
                return None

    if os.path.exists(path):
        shutil.rmtree(path)
        print('remove ' + path + '\n')


def main():
    os.chdir(main_dir)

    for root, dirs, files in os.walk(os.path.join(main_dir, unsorted)):
        for file in files:
            if file.lower().endswith(ext):
                actress = dmm_search(file)
                new_file = os.path.splitext(file)[0].upper().replace('_', '-') + os.path.splitext(file)[1].lower()
                new_file = new_file.replace(' ', '')
                # print(new_file)
                mkdir(os.path.join(main_dir, 'sorted', actress))
                print(actress)
                try:
                    src = os.path.join(root, file)
                    dst = os.path.join(main_dir, 'sorted', actress, new_file)
                    shutil.move(src, dst)
                    print('move ' + src + ' to ' + dst)
                except:
                    print('move failed!')
        rmdir(root)


if __name__ == '__main__':

    reload(sys)
    sys.setdefaultencoding('utf-8')

    main_dir = '/root/K/TMP.old/PNSort'
    unsorted = 'unsorted'

    ext = ('.mp4', '.iso', '.mkv', '.avi', '.flv', '.mov', '.wmv', '.rmvb')

    if test():
        main()
    else:
        print('Bad IP, Can\'t get dmm infos')
