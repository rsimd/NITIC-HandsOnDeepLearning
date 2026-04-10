# NITIC: Hands-on Deep Learning — 仕様・再現手順

## リポジトリ

- GitHub: <https://github.com/rsimd/NITIC-DeepLearning>
- 公開サイト（GitHub Pages 有効化後）: `https://rsimd.github.io/NITIC-DeepLearning/`

旧リポジトリ名 `NITIC-HandsOnDeepLearning` から移行する場合は、GitHub の **Settings → General → Repository name** で名前を変更し、ローカルの `git remote set-url origin <新しいURL>` を更新する。

## 構成

| 項目 | 説明 |
|------|------|
| 教材本文 | `notebooks/`（`introduction.md`, `python.ipynb` ほか） |
| Jupyter Book 設定 | リポジトリ直下の `myst.yml`（MyST / Jupyter Book 2） |
| ビルド成果物 | `_build/html`（`jupyter-book build --html`、GitHub Pages 用） |

`notebooks-instructor/` は教員用のため **Git の追跡対象外**（`.gitignore`）とする。

## ローカルでサイトをビルドする

前提: [uv](https://github.com/astral-sh/uv) をインストール済みであること。

```bash
uv sync --all-groups
BASE_URL=/NITIC-DeepLearning uv run jupyter-book build --html
mkdir -p _build/html/python_etc
cp notebooks/python_etc/*.html _build/html/python_etc/
```

生成物は `_build/html` に出力される（ルートに `index.html` がある）。GitHub Pages と同じパス前提で見る場合は `BASE_URL` をリポジトリ名に合わせる。プレビューは `_build/html` を静的サーバで配信する。

`notebooks/python.ipynb` 内の iframe は、公開サイトではベースパス直下の `python_etc/` を参照する（例: `/NITIC-DeepLearning/python_etc/hanoi.html`）。上記の `cp` でビルド成果物に置く。CI でも同様の同期を行う。

## GitHub Pages

1. リポジトリ **Settings → Pages** を開く。
2. **Build and deployment** の **Source** で **GitHub Actions** を選ぶ。
3. `main` へ push すると `.github/workflows/deploy-jupyter-book.yml` が実行され、サイトがデプロイされる。

プロジェクトリポジトリ（`*.github.io` 以外）ではビルド時に `BASE_URL` にリポジトリ名が渡され、アセットパスが正しく解決される（ワークフロー内の `env` を参照）。

MyST の静的出力には `build/_assets` のように先頭が `_` のディレクトリが含まれる。ブランチ直デプロイでは Jekyll がこれらを除外することがあるため、CI では成果物ルートに **`.nojekyll`** を置いている（Actions の artifact デプロイでも念のため有効）。

## 参考

- [Jupyter Book](https://jupyterbook.org/)
- [MyST Markdown](https://mystmd.org/guide/)
