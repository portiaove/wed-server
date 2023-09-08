const pictureViewer = (iframeSrc) =>
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Las Fotitos!!</title>
    <link rel="icon" type="image/png" href="../../assets/flowa-32.png" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <iframe
      id="MemzoInt"
      src="${iframeSrc}"
      style="
        border: none;
        width: 100%;
        min-height: 720px;
        overflow-y: hidden;
        overflow: hidden;
      "
      title="Get Your Photos"
    >
    </iframe>
  </body>
</html>`;

module.exports = pictureViewer;
