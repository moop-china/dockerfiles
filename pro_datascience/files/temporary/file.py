from tornado import web

from notebook.base.handlers import IPythonHandler

class ForbidDownloadingFilesHandler(IPythonHandler):

    @web.authenticated

    def head(self, path):

        self.log.info("对不起，禁止下载文件！！！")

        raise web.HTTPError(403)

    @web.authenticated

    def get(self, path, include_body=True):

        self.log.info("对不起，禁止下载文件！！！")

        raise web.HTTPError(403)
c.ContentsManager.files_handler_class = 'ForbidDownloadingFilesHandler'

c.ContentsManager.files_handler_params = {}
