# QR-koza Backend API

## 前提

* node 6.10
* npm 5.x

## デプロイの方法

[Servless Framework](https://serverless.com/)を使用します。  
そしてdocker-composeによるデプロイを推奨します。（ローカルにservlerlessをインストールしてもできますが）

```
$ AWS_PROFILE=syncpay NODE_ENV=DEV docker-compose up deploy
```

| 環境変数    | 説明                                                     |
|:------------|:---------------------------------------------------------|
| AWS_PROFILE | デプロイ時に使用する`~/.aws/credentials`のプロファイル名 |
| NODE_ENV    | デプロイするステージ名(`DEV`,`DEMO`)                    |

## Test

```
$ AWS_PROFILE=<YOUR PROFILE> npm test
```

ソースコードの修正が行われたタイミングでテストをしたい場合は`-w (--watch)`を指定して実行します。

```
$ AWS_PROFILE=<YOUR PROFILE> npm test -- -w
```

### カバレッジも出す場合

テスト実行後、`./coverage`にカバレッジ結果が出力されます。

```
$ AWS_PROFILE=<YOUR PROFILE> npm run test:coverage
```
## その他

* [カスタムドメインを設定する件](docs/CustomDomain.md)


## ローカル環境で実行する

ローカル環境でDBとAPIサーバーを実行します。

### Dockerでローカル環境にDBを立てる

Docker Composeを使って、DBを起動します。

```
$ docker-compose up -d db
```

### ローカルに立てたDBにマイグレーションを実行する

`tools/DB`にあるプロジェクトからマイグレーションが行えます。  
このプロジェクトを使って、ローカルに立てたDBにマイグレーションを実行します。

#### インストール

```
$ npm install
```


#### マイグレーションの実行

ローカルのDBにマイグレーションを実行します。  

```
$ NODE_ENV=LOCALDEV npm run migrate
```

ロールバックを行う場合は、`NODE_ENV=LOCALDEV npm run undo`を実行します。

### APIを起動する

serverless-offlineを使って、ローカル環境でAPIを実行します。

```
$ NODE_ENV=LOCALDEV serverless offline start
```
