---
title: Default module
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"
---

# Default module

Base URLs: https://vasiatkon.runflare.run

# Authentication

# auth

## POST request otp

POST /api/v1/users/otp

> Body Parameters

```json
{
  "mobile": "09386006620",
  "device_id": "test"
}
```

### Params

| Name | Location | Type   | Required | Description |
| ---- | -------- | ------ | -------- | ----------- |
| body | body     | object | yes      | none        |

> Response Examples

> 200 Response

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "_id": "string",
      "Title": "string",
      "Description": "string",
      "img": "string",
      "package": "string",
      "createdAt": "string",
      "__v": 0
    }
  ]
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name           | Type     | Required | Restrictions | Title | description |
| -------------- | -------- | -------- | ------------ | ----- | ----------- |
| » success      | boolean  | true     | none         |       | none        |
| » message      | string   | true     | none         |       | none        |
| » data         | [object] | true     | none         |       | none        |
| »» \_id        | string   | false    | none         |       | none        |
| »» Title       | string   | false    | none         |       | none        |
| »» Description | string   | false    | none         |       | none        |
| »» img         | string   | false    | none         |       | none        |
| »» package     | string   | false    | none         |       | none        |
| »» createdAt   | string   | false    | none         |       | none        |
| »» \_\_v       | integer  | false    | none         |       | none        |

## POST verify otp

POST /api/v1/users/otpverify

temp از ریسپانس درخوسات otp بدست میاد

signup اگر ترو باشه یعنی بفرست صفحه ای که نام و نام خانوادگی هم بگیره
اگر فالس بود یعنی اینکه این ثبت نام کرده و داره ورود میکنه

> Body Parameters

```json
{
  "mobile": "09386006620",
  "temp": "IRgWg4jVSl",
  "code": "9795",
  "device_id": "waopdigoawiudad",
  "device_name": "dwapdihawbidawbd"
}
```

### Params

| Name | Location | Type   | Required | Description |
| ---- | -------- | ------ | -------- | ----------- |
| body | body     | object | yes      | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## POST signup

POST /api/v1/users/signup

> Body Parameters

```json
{
  "fullname": "محمد حسین چوازی"
}
```

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| authorization | header   | string | no       | none        |
| body          | body     | object | yes      | none        |

> Response Examples

> 401 Response

```json
{
  "message": "string"
}
```

### Responses

| HTTP Status Code | Meaning                                                         | Description | Data schema |
| ---------------- | --------------------------------------------------------------- | ----------- | ----------- |
| 401              | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **401**

| Name      | Type   | Required | Restrictions | Title | description |
| --------- | ------ | -------- | ------------ | ----- | ----------- |
| » message | string | true     | none         |       | none        |

# home

## GET home requests

GET /api/v1/home/index

بخش کامنت ها میاد کامنت های کاربران اولیه رو نشون میده

بخش سفارش ها اونی که بیشتره یعنی مثلا تا الان 1700 نفر وصیت خودشون رو ثبت کردن
1300 تا هم مثلا با موفقیت وصیت به دستشون رسیده

> Response Examples

> 200 Response

```json
{
  "success": true,
  "message": "string",
  "comments": [
    {
      "_id": "string",
      "user_id": "string",
      "product_id": "string",
      "comment": "string",
      "fullname": "string",
      "confirmed": true,
      "rate": 0,
      "createdAt": "string",
      "__v": 0,
      "device_id": "string",
      "ip": "string",
      "name": "string",
      "user": "string"
    }
  ],
  "orders": {
    "submited": 0,
    "success": 0
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name          | Type     | Required | Restrictions | Title | description |
| ------------- | -------- | -------- | ------------ | ----- | ----------- |
| » success     | boolean  | true     | none         |       | none        |
| » message     | string   | true     | none         |       | none        |
| » comments    | [object] | true     | none         |       | none        |
| »» \_id       | string   | true     | none         |       | none        |
| »» user_id    | string   | true     | none         |       | none        |
| »» product_id | string   | true     | none         |       | none        |
| »» comment    | string   | true     | none         |       | none        |
| »» fullname   | string   | true     | none         |       | none        |
| »» confirmed  | boolean  | true     | none         |       | none        |
| »» rate       | integer  | true     | none         |       | none        |
| »» createdAt  | string   | true     | none         |       | none        |
| »» \_\_v      | integer  | true     | none         |       | none        |
| »» device_id  | string   | true     | none         |       | none        |
| »» ip         | string   | true     | none         |       | none        |
| »» name       | string   | true     | none         |       | none        |
| »» user       | string   | true     | none         |       | none        |
| » orders      | object   | true     | none         |       | none        |
| »» submited   | integer  | true     | none         |       | none        |
| »» success    | integer  | true     | none         |       | none        |

# Data Schema
