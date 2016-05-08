<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
          content="This manifesto proposes a principled methodology for unifying science and technology.">

    <meta property="og:url" content="{{ $ogMeta['link'] or $url }}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="{{ $ogMeta['title'] or 'The Professional Data Science Manifesto' }}">
    <meta property="og:image" content="{{ $ogMeta['image'] or  $url . 'images/social/og-image.jpg' }}">
    <meta property="og:description"
          content="{{ $ogMeta['desc'] or 'This manifesto proposes a principled methodology for unifying science and technology.'}}">

    <title>The Professional Data Science Manifesto</title>

    <link rel="stylesheet" href="/css/website.min.css">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon-precomposed" href="/images/social/bookmark.jpg">

    <script type="text/javascript">
        WebFontConfig = {
            google: {families: ['Roboto+Mono:400,300,500:latin']}
        };
        (function () {
            var wf = document.createElement('script');
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        })(); </script>
</head>
<body class="preload page-{{$bodyClass}}">

@include('nav')

@yield('content')

@include('footer')

<script type="text/javascript">
    var _qevents = _qevents || [];

    (function () {
        var elem = document.createElement('script');
        elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
        elem.async = true;
        elem.type = "text/javascript";
        var scpt = document.getElementsByTagName('script')[0];
        scpt.parentNode.insertBefore(elem, scpt);
    })();

    _qevents.push({
        qacct: "p-VArSp9GnU4H34"
    });
</script>

<noscript>
    <div style="display:none;">
        <img src="//pixel.quantserve.com/pixel/p-VArSp9GnU4H34.gif" border="0" height="1" width="1" alt="Quantcast"/>
    </div>
</noscript>

<script>
    (function (w, i, d, g, e, t, s) {
        w[d] = w[d] || [];
        t = i.createElement(g);
        t.async = 1;
        t.src = e;
        s = i.getElementsByTagName(g)[0];
        s.parentNode.insertBefore(t, s);
    })(window, document, '_gscq', 'script', '//widgets.getsitecontrol.com/27413/script.js');
</script>

<script src="markdown.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        var md = document.getElementById('parseMd');
        md.innerHTML = markdown.toHTML(md.innerHTML);

        var links = document.links;

        for (var i = 0, linksLength = links.length; i < linksLength; i++) {
            if (links[i].hostname != window.location.hostname) {
                links[i].target = '_blank';
            }
        }
    });
</script>
</body>
</html>
