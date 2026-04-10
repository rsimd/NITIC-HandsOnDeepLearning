> This project was created by the AI code editor “Cursor”.
> The large language model (LLM) used by Cursor follows the model selected in your Cursor settings.
> Detailed specifications are documented in [specifications.md](specifications.md).

# NITIC: Hands-on Deep Learning

深層学習の教材リポジトリです。`notebooks/` の内容を [Jupyter Book](https://jupyterbook.org/) 2（[MyST](https://mystmd.org/)）でサイト化し、[GitHub Pages](https://pages.github.com/) で公開します。

## リポジトリ

ソース: [github.com/rsimd/NITIC-HandsOnDeepLearning](https://github.com/rsimd/NITIC-HandsOnDeepLearning)

**注意:** 以前 `NITIC-DeepLearning` という URL で clone している場合は、`git remote set-url origin https://github.com/rsimd/NITIC-HandsOnDeepLearning.git` のように更新すること。

## ローカルでのビルド

依存関係のインストールとビルドは `uv` で行います。

```bash
uv sync --all-groups
BASE_URL=/NITIC-HandsOnDeepLearning uv run jupyter-book build --html
mkdir -p _build/html/python_etc
cp notebooks/python_etc/*.html _build/html/python_etc/
```

HTML は `_build/html` に出力されます（`index.html` あり。`--site` だけでは Pages で 404 になります）。ノート内の `iframe` 用 HTML は上記 `cp` で成果物に含めます（CI でも同期します）。

## GitHub Pages の有効化

初回のみ、リポジトリの **Settings → Pages** で **Source** を **GitHub Actions** に設定してください。`main` ブランチへの push で `.github/workflows/deploy-jupyter-book.yml` が走り、サイトが更新されます。

公開 URL は通常 `https://rsimd.github.io/NITIC-HandsOnDeepLearning/` になります（ユーザー名・リポジトリ名に依存します）。

## 教員用ノートブックについて

`notebooks-instructor/` はローカル専用であり、`.gitignore` により Git の追跡対象外です。リモートには含まれません。

## 詳細

再現手順・構成の詳細は [specifications.md](specifications.md) を参照してください。
