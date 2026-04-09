# NITIC Hands-On Deep Learning — 仕様・再現手順

## リポジトリ

- GitHub: <https://github.com/rsimd/NITIC-HandsOnDeepLearning>
- 公開サイト（GitHub Pages 有効化後）: `https://rsimd.github.io/NITIC-HandsOnDeepLearning/`

## 構成

| 項目 | 説明 |
|------|------|
| 教材本文 | `notebooks/`（`introduction.md`, `python.ipynb` ほか） |
| Jupyter Book 設定 | リポジトリ直下の `myst.yml`（MyST / Jupyter Book 2） |
| ビルド成果物 | `_build/site/public`（ローカル・CI 共通） |

`notebooks-instructor/` は教員用のため **Git の追跡対象外**（`.gitignore`）とする。

## ローカルでサイトをビルドする

前提: [uv](https://github.com/astral-sh/uv) をインストール済みであること。

```bash
uv sync --all-groups
uv run jupyter-book build --site
```

生成物は `_build/site/public` に出力される。プレビューは任意の静的ファイルサーバで `public` を配信する。

## GitHub Pages

1. リポジトリ **Settings → Pages** を開く。
2. **Build and deployment** の **Source** で **GitHub Actions** を選ぶ。
3. `main` へ push すると `.github/workflows/deploy-jupyter-book.yml` が実行され、サイトがデプロイされる。

プロジェクトリポジトリ（`*.github.io` 以外）ではビルド時に `BASE_URL` にリポジトリ名が渡され、アセットパスが正しく解決される（ワークフロー内の `env` を参照）。

## 参考

- [Jupyter Book](https://jupyterbook.org/)
- [MyST Markdown](https://mystmd.org/guide/)
