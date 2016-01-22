from django.conf.urls import include, url
from django.contrib import admin
from ssdb import settings

urlpatterns = [
    # Examples:
    url(r'^$', 'ssdb.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include('movies.urls')),
    # url(r'^api/', include('authentication.urls')),
    url(r'^api/register/$', 'authentication.views.register'),
    url(r'^api/login/$', 'authentication.views.login'),
    url(r'^api/logout/$', 'authentication.views.logout'),
    url(r'^logout/$', 'authentication.views.log_out', name="log_out"),
]
