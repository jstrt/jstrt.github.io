---
layout: post
title:  "HTTP Header"
date: 2025-12-01 20:00:00 +0900
---

<div style="
  text-align: center;
  margin: 4rem auto;
  padding: 2.5rem;
  max-width: 800px;
  border: 1px solid #333;
  border-radius: 14px;
">

<h2>HTTP Header 개념 정리 (보안 관점)</h2>

<p>
HTTP Header는 콜론(<strong>:</strong>)으로 구분되는 key-value 형태로 설정됩니다.<br>
HTTP 통신에서 헤더는 요청(Request)과 응답(Response)에 포함되어 부가 정보를 전달합니다.
</p>

<p>
일반적으로 HTTP 헤더는 역할에 따라 <strong>일반 헤더, 요청 헤더, 응답 헤더</strong>로 분류하여 이해합니다.<br>
이 분류는 개념적인 구분이며, 실제로 헤더가 자동으로 세 종류로 생성된다는 의미는 아닙니다.
</p>

<hr>

<h3>HTTP 요청 구조에 대한 올바른 이해</h3>

<p>
HTTP 요청은 크게 <strong>요청 라인(Request Line)</strong>과 <strong>헤더 영역</strong>으로 구성됩니다.
</p>

<pre style="text-align:left;">
GET /login HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0 ...
</pre>

<p>
<code>GET /login HTTP/1.1</code>은 요청 라인입니다.<br>
요청 라인에는 HTTP 메서드와 URL이 포함됩니다.
</p>

<p>
그 아래부터가 HTTP 헤더 영역입니다.
</p>

<p>
<strong>요청 메서드(GET, POST)와 URL은 헤더가 아닙니다.</strong>
</p>

<hr>

<h3>일반 헤더</h3>

<p>
일반 헤더는 요청과 응답 모두에서 공통적으로 사용될 수 있는 헤더입니다.<br>
네트워크 연결, 캐시 정책, 메시지 생성 시간 등의 메타 정보를 전달합니다.
</p>

<p><strong>대표적인 일반 헤더입니다.</strong></p>

<ul style="text-align:left; display:inline-block;">
  <li>Date</li>
  <li>Connection</li>
  <li>Cache-Control</li>
</ul>

<p>
요청한 URL이나 요청 메서드는 일반 헤더에 포함되지 않습니다.
</p>

<hr>

<h3>요청 헤더</h3>

<p>
요청 헤더는 클라이언트가 서버에 요청을 보낼 때 함께 전달하는 부가 정보입니다.<br>
브라우저에 의해 자동으로 설정되거나 클라이언트가 직접 설정할 수 있습니다.
</p>

<p>
요청 헤더에는 클라이언트 환경 정보와 인증 정보가 주로 포함됩니다.
</p>

<h4>User-Agent</h4>

<pre style="text-align:left;">
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
</pre>

<p>
User-Agent는 클라이언트의 운영체제, 브라우저 종류, 렌더링 엔진 정보를 서버에 전달합니다.
</p>

<p>
보안 관점에서 User-Agent는 신뢰할 수 없는 정보입니다.<br>
공격자는 User-Agent 값을 쉽게 조작하여 정상 사용자나 특정 브라우저로 위장할 수 있습니다.
</p>

<p>
따라서 User-Agent는 통계나 참고 용도로만 사용되어야 하며,<br>
인증이나 권한 판별 로직에 사용해서는 안 됩니다.
</p>

<h4>Cookie</h4>

<pre style="text-align:left;">
Cookie: PHPSESSID=ce11b6b0417e087c9b7ed0a2f11240a5
</pre>

<p>
Cookie 헤더는 클라이언트가 서버로 전달하는 쿠키 값입니다.<br>
주로 로그인 세션과 같은 인증 정보를 담고 있습니다.
</p>

<p>
서버는 이 쿠키 값을 인증 티켓처럼 신뢰합니다.<br>
따라서 쿠키가 탈취되면 세션 탈취(Session Hijacking)로 이어질 수 있습니다.
</p>

<hr>

<h3>응답 헤더</h3>

<p>
응답 헤더는 서버가 클라이언트에게 응답을 보낼 때 설정하는 헤더입니다.<br>
응답 데이터의 타입, 보안 정책, 서버 정보 등이 포함됩니다.
</p>

<p><strong>대표적인 응답 헤더입니다.</strong></p>

<ul style="text-align:left; display:inline-block;">
  <li>Content-Type</li>
  <li>Content-Length</li>
  <li>Set-Cookie</li>
  <li>Server</li>
  <li>Referrer-Policy</li>
</ul>

<h4>Server 헤더와 보안</h4>

<pre style="text-align:left;">
Server: nginx
</pre>

<p>
Server 헤더에는 서버 소프트웨어 정보가 포함될 수 있습니다.<br>
이 정보는 공격자에게 서버 환경과 취약점 탐색 힌트를 제공할 수 있습니다.
</p>

<p>
따라서 대부분의 운영 서버는 Server 헤더를 숨기거나 최소한의 정보만 제공합니다.
</p>

<pre style="text-align:left;">
Server: NWS
</pre>

<p>
이는 Naver Web Server를 의미합니다.<br>
gzip 압축 사용 여부 외에 상세한 서버 정보는 노출되지 않습니다.
</p>

<hr>

<h3>Set-Cookie 응답 헤더</h3>

<pre style="text-align:left;">
Set-Cookie: sessionid=abc123
</pre>

<p>
Set-Cookie는 서버가 클라이언트에게 새로운 쿠키를 설정할 때 사용하는 응답 헤더입니다.
</p>

<table style="margin:0 auto; border-collapse: collapse;" border="1">
  <tr>
    <th>구분</th>
    <th>위치</th>
    <th>역할</th>
  </tr>
  <tr>
    <td>Cookie</td>
    <td>요청 헤더</td>
    <td>클라이언트 → 서버</td>
  </tr>
  <tr>
    <td>Set-Cookie</td>
    <td>응답 헤더</td>
    <td>서버 → 클라이언트</td>
  </tr>
</table>

<p>
이는 HTTP 인증 구조에서 매우 중요한 개념입니다.
</p>

<hr>

<h3>응답 헤더 만들어 보기 (Node.js)</h3>

<pre style="text-align:left;">
const http = require("http");
const hostname = "127.0.0.1";
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("X-Khan-Message", "Welcome to khan blog");
  res.end("Don't give up mate!");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
</pre>

<p>
HTTP Header는 매우 유연하게 설계되어 있어 커스텀 헤더를 생성할 수 있습니다.<br>
하지만 실제 서비스 환경에서는 표준 헤더를 사용하는 것이 일반적입니다.
</p>

<hr>

<h3>보안 관점 핵심 정리</h3>

<ul style="text-align:left; display:inline-block;">
  <li>HTTP 헤더는 서버와 클라이언트 간의 신뢰 정보를 담고 있습니다</li>
  <li>요청 메서드와 URL은 헤더가 아닙니다</li>
  <li>User-Agent는 신뢰하면 안 되는 정보입니다</li>
  <li>Cookie는 인증의 핵심이므로 탈취 시 큰 보안 사고로 이어집니다</li>
  <li>Server 헤더는 공격 표면을 증가시킵니다</li>
</ul>

<hr>

<h3>결론</h3>

<p>
HTTP Header는 단순한 부가 정보가 아닙니다.<br>
서버가 무엇을 신뢰하고 어떤 기준으로 요청을 처리하는지를 보여주는 핵심 요소입니다.
</p>

<p>
HTTP Header를 정확히 이해하는 것은<br>
웹 해킹과 웹 보안을 이해하기 위한 출발점입니다.
</p>

</div>
