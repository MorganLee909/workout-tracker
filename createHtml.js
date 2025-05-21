import esbuild from "esbuild";
import htmlMinifier from "html-minifier-terser";
import fsSync from "fs";

const fs = fsSync.promises;

export default async ()=>{
    const esbuildProm = esbuild.build({
        entryPoints: [`${global.cwd}/views/index.js`, `${global.cwd}/views/index.css`],
        bundle: true,
        minify: true,
        sourcemap: process.env.NODE_ENV === "production",
        write: false,
        outdir: `${global.cwd}/views/build/`
    });
    const htmlProm = fs.readFile(`${import.meta.dirname}/views/index.html`, "utf-8");
    const [build, html] = await Promise.all([esbuildProm, htmlProm]);

    const js = build.outputFiles[0].text;
    const css = build.outputFiles[1].text;

    let data = await htmlMinifier.minify(html, {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        decodeEntities: true,
        noNewlinesBeforeTagClose: true,
        removeComments: true
    });

    data = data.replace('<script src="/index.js"></script>', `<script>${js}</script>`);
    data = data.replace('<link rel="stylesheet" href="/index.css">', `<style>${css}</style>`);

    if(process.env.NODE_ENV !== "process"){
        fs.writeFile(`${import.meta.dirname}/build.html`, data);
    }

    return data;
}
