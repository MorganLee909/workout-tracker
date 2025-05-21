export default (app)=>{
    app.get("/", (req, res)=>res.send(global.html));
    app.get("/logo.svg", (req, res)=>res.sendFile(`${global.cwd}/views/logo.svg`));
    app.get("/logo.png", (req, res)=>res.sendFile(`${global.cwd}/views/logo.png`));
    app.get("/manifest.json", (req, res)=>res.sendFile(`${global.cwd}/views/manifest.json`));
    app.get("/serviceWorker.js", (req, res)=>res.sendFile(`${global.cwd}/views/serviceWorker.js`));
}
