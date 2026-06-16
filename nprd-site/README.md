# NPRD コーポレートサイト（2026年リニューアル版）

次世代教育学研究開発株式会社（NPRD）の公式コーポレートサイト一式です。
HTML / CSS / JS のみで構成された静的サイトで、サーバーへアップロードすればそのまま公開できます。

## ファイル構成

```
nprd-site/
├── index.html         HOMEページ
├── vision.html        Visionページ
├── products.html      プロダクト詳細ページ
├── company.html       会社案内ページ
├── investor.html      投資家向け情報ページ
├── contact.html       お問合せページ（フォーム付き）
├── css/
│   └── styles.css     共通スタイルシート
├── js/
│   └── main.js        ナビ・スクロール・フォーム制御
└── assets/
    ├── img/           新規生成イラスト（hero, sspad, sumasuku, sscheck, ssmanager 等）
    └── legacy/        旧サイトから流用したアセット（ロゴ・CEO画像・旧アイコン）
```

## 公開方法

1. `nprd-site/` フォルダの中身を、Webサーバーのドキュメントルートへアップロード。
2. ルートに `index.html` が来るように配置すれば即公開できます。
3. ローカル確認は `cd nprd-site && python3 -m http.server 8000` で `http://localhost:8000/` を開いてください。

## 採用したデザイン方針

- **企業カラー2色**: 信頼の `#1B5C94`（ブルー）／ 成長の `#5BA02E`（グリーン）
- **タイポグラフィ**: Noto Sans JP（本文）＋ Inter（数字・英字）。実績数字は最大76pxで圧倒的に見せる。
- **構成**: ai-consulting.jp 的なスクロール導線 — ヒーロー → 実績 → プロダクト → 選ばれる理由 → CEO → CTA。
- **アニメーション**: スクロール連動の控えめなフェードイン（IntersectionObserver）。
- **レスポンシブ**: 880px / 720px / 520px の3ブレークポイント。スマホでドロワーメニュー化。

## 技術仕様

- 純粋なHTML/CSS/JS。フレームワーク不要。
- お問合せフォームは JS で送信完了メッセージを表示（バックエンド連携は導入時に差し替え可能）。
- 同一オリジン内のアンカーリンクはスムーズスクロール＋ヘッダー高オフセット付き。
- JS が無効でも全コンテンツが見える `.js-on` ガード付きフェードイン。
- 画像は JPEG 圧縮済み（各 250KB 以下）。

## 著作権

© 2026 NPRD All rights Reserved.
