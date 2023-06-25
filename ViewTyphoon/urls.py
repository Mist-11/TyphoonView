"""ViewTyphoon URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

import view
import getTyphoon
import getway

urlpatterns = [
    path('', view.index, name='index'),
    path('getlist/2022/', getTyphoon.getlist2022),
    path('getlist/2021/', getTyphoon.getlist2021),
    path('getlist/2020/', getTyphoon.getlist2020),
    path('getlist/2019/', getTyphoon.getlist2019),
    path('getlist/2018/', getTyphoon.getlist2018),
    path('getlist/2017/', getTyphoon.getlist2017),
    path('getlist/2016/', getTyphoon.getlist2016),
    path('getlist/2015/', getTyphoon.getlist2015),
    path('getlist/2014/', getTyphoon.getlist2014),
    path('getlist/2013/', getTyphoon.getlist2013),
    path('getlist/2012/', getTyphoon.getlist2012),
    path('getlist/2011/', getTyphoon.getlist2011),
    path('getlist/2010/', getTyphoon.getlist2010),
    path('way/2022/', getway.getway2022),
    path('way/2021/', getway.getway2021),
    path('way/2020/', getway.getway2020),
    path('way/2019/', getway.getway2019),
    path('way/2018/', getway.getway2018),
    path('way/2017/', getway.getway2017),
    path('way/2016/', getway.getway2016),
    path('way/2015/', getway.getway2015),
    path('way/2014/', getway.getway2014),
    path('way/2013/', getway.getway2013),
    path('way/2012/', getway.getway2012),
    path('way/2011/', getway.getway2011),
    path('way/2010/', getway.getway2010),
    path('placerank/', view.rank),
    path('kind/', view.variety),
    path('month/', view.month),
    path('money/', view.moneynum),
    path('people/', view.peoplenum),
    path('yearnum/', view.yearnum),
    path('moneymean/', view.money_mean),
    path('peoplemean/', view.people_mean),
    path('Intensity/', view.Intensity),
    path('dacause/', view.dacause, name='dacause'),
    path('knowledge/', view.knowledge, name='knowledge'),
    path('rain/24/', view.rain24h),
]
