import http.server
import socketserver
import os

PORT = 20005

class UploadHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        # Only handle /source/updated.csv
        if self.path == '/source/updated.csv':
            length = int(self.headers['Content-Length'])
            data = self.rfile.read(length)
            os.makedirs('source', exist_ok=True)
            with open('source/updated.csv', 'wb') as f:
                f.write(data)
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')  # CORS header
            self.end_headers()
            self.wfile.write(b'File uploaded successfully')
        else:
            self.send_response(404)
            self.end_headers()

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')  # CORS header for GET
        super().end_headers()

with socketserver.TCPServer(("", PORT), UploadHandler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()