// render first screen
const temp = (content, initialState) => (
`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>古聞铭</title>
<meta content="yes" name="apple-touch-fullscreen">
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
<script src="/library/reset.js"></script>
<link rel="stylesheet" href="/styles/app.css">
</head>
<body>
<div id="app"></div>
<script src="/library/react.js"></script>
<script src="/scripts/app.js"></script>
</body>
</html>`
);


module.exports = async (ctx, next) => {
    ctx.body = temp();

    await next();
}
