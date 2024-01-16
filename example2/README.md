# README

This is the same as the first example, just split into separate files. And, since they're separate files, we need a server to make this work. If you try to open `index.html` directly in the browser without going through a server, it will show you the CORS issue I mentioned in the first example.

If you have [Node.js](https://nodejs.org/en/download/) installed, you can run `npx http-server .` from this folder in [a terminal](https://code.visualstudio.com/docs/terminal/basics) to run a simple server that will provide these files to a browser, when it asks for them. That command should also provide links to click or type into the browser when it starts up like `http://127.0.0.1:8080`. It's a good idea to get familiar with the "Network" tab in [the Chrome Developer Tools](https://developer.chrome.com/docs/devtools/open) so you know what all file requests are being made - this is especially helpful to find typos (you may need to reload the page after opening dev tools to see all the files being requested). When you load `http://127.0.0.1:8080` in the browser, the `index.html` file is automatically assumed, but you could also type `http://127.0.0.1:8080/index.html`. Once that's loaded, the browser reads the HTML file from top to bottom and knows to load the other files when it comes across the `href` and `src` links.

## Extra #1 - Blocking Resources

If the browser comes across certain links when looking down through an HTML file, it may wait to load that file before continuing. This means we may not have a part of the HTML available yet when some code is run. `<script type="module">` and `<script defer>` won't block so we know the HTML file will be completely read through when that JS code runs. The old way of making sure of that was to either put a `<script>` at the very end of the `<body>` tag, or to [wrap your JS code and only run it when a "loaded" event was fired](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)

## Extra #2 - URLs

By the way, a URL is broken down into a few parts:

- `http` or the secure version `https` are the rules (protocol) we agree to use on both computers for how we send and receive information.
- `127.0.0.1` is an IP address - like a mailing address, it is just a number used to locate a computer. We can also use names via DNS - a service that converts names like `google.com` into IP addresses.
    - Note that `127.0.0.1` is a special address - it is called the "loopback address" always refers to this computer. In a similar way, `localhost` is a special name and is mapped to `127.0.0.1`. So, `http://127.0.0.1:8080` can also be written as `http://localhost:8080`.
    - You can also map names to IP addresses using a local file that your OS uses. For example: in Windows, you can update the `C:\Windows\System32\drivers\etc\hosts` file. This lets you use a specific URL for your project
- The `:8080` part is a port - which is something like a channel. You can have multiple channels of communication to the same computer. Just like how `index.html` is commonly assumed when we don't type it, `:80` is assumed for `http` and `:443` is assumed for `https`, but those ports are often protected by security measures, so servers for development like `http-server` tend to use bigger numbers like `:8080` by default.