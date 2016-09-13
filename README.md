# ModuleStyle

Declarative way to specify module-css with React, using [css-loader](https://github.com/webpack/css-loader) and [react-side-effect](https://github.com/gaearon/react-side-effect).

Can be used both on the client and the server.

## Install

    npm install --save module-style

## Usage

The `ModuleStyle` component is supposed to be used in tandem with [`css-loader`](https://github.com/webpack/css-loader), preferrably with [`css-modules`](https://github.com/webpack/css-loader#css-modules).

### Example

Install dependencies

    npm install --save module-style
    npm install --save-dev css-loader

`MyModule.js`: React component

    import React from 'react';
    import ModuleStyle from 'module-style;
    import style, { locals as s } from './MyModule.css';

    const MyModule = () =>
      <ModuleStyle style={style}>
        <div className={s.root}>
          <div className={s.container}>
            <h1>My module page</h1>
            <p>...</p>
          </div>
        </div>
      </ModuleStyle>

    export default MyModule;

`MyModule.css`: Stylesheet

    .root {
        background-color: blue;
    }

    .container {
        background-color: red;
    }

`webpack.config.js`: Webpack configuration

    {
      module: {
        loaders: [
          {
            test: /\.css/,
            loaders: [
              'css-loader?modules',
            ],
          },
        ],
      },
    }

### Server-side

On the server you can get the style with the `ModuleStyle.rewind()` function.

    import ReactDOM from 'react-dom';
    import ModuleStyle from 'module-style';
    import MyModule from './MyModule';
    // ...

    app.get('*', (req, res) => {
        const content = ReactDOM.renderToString(<MyModule />);
        const style = ModuleStyle.rewind();

        res.send(`<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <style type="text/css">${style}</style>
                </head>
                <body>
                    <div id="app">${content}</div>
                </body>
            </html>`);
    });

## License

[ISC License](LICENSE.txt).
