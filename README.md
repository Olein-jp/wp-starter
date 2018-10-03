# Gulpを使ったWordPressテーマ開発環境

Gulpを使ってWordPressテーマ開発をするスターターセットです。

## 構成図
┌ gulpfile.js     
├ package-lock.json     
├ package.json     
├ sass     
│ ├ style.scss     
│ ├ ....     
│ └ ....     
├ images     
│ ├ src (stock images before minify)     
│ └ sample.jpg     
├ js     
│ ├ sample-1.js     
│ ├ sample-2.js     
│ └ app.min.js (concated file)     
└ node_modules     

## 使い方
1. WordPressのテーマ開発ディレクトリを作成します。
2. ディレクトリにこちらのコードをコピー
3. `npm init`
4. `gulpfile.js`のプロキシ設定部分をご自身の設定に書き換える
5. `gulp` で作業開始
