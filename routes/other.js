export default (app)=>{
    app.get("/", (req, res)=>res.sendFile(`${global.cwd}/views/index.html`));
    app.get("/index.js", (req, res)=>res.sendFile(`${global.cwd}/views/build/index.js`));
    app.get("/index.css", (req, res)=>res.sendFile(`${global.cwd}/views/build/index.css`));
    app.get("/logo.svg", (req, res)=>res.sendFile(`${global.cwd}/views/logo.svg`));
    app.get("/manifest.json", (req, res)=>res.sendFile(`${global.cwd}/views/manifest.json`));
}
