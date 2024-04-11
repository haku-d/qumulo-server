## Qumulo Backend Service 

### Run server locally

1. Install dependencies

```
npm install
```

2. Copy the example `.env`

```
cp .env.example .env
```

3. Run the project

```
npm run dev
```

### Generate sample data for time series

```
node ace gen:data
```

All output data will be stored under `database` directory

### API Endpoints

```
METHOD ROUTE ...................................................................... HANDLER MIDDLEWARE
GET    /:id/metrics ................................. #controllers/metrics_controller.index
GET    /:id/snapshot_policy ............... #controllers/snapshot_policies_controller.index
PUT    /:id/snapshot_policy .............. #controllers/snapshot_policies_controller.update
```

---

### Retrieving the time series data

#### Request example

`GET /:id/metrics`

#### Parameters

##### Path parameters

`:id` string

The id of cluster to fetch the time series data

##### Query parameters

`period` string

Default: `7d`
Can be one of: `7d`, `24h`, `30d`

#### Example Response

```json
{
  "indicators": {
    "iops": {
      "read": [121849],
      "write": [121849]
    },
    "throughput": {
      "read": [121849],
      "write": [121849]
    }
  },
  "timestamp": [
    1711911124,
    1711914724
  ]
}
```

---

### Get cluster's snapshot policy

#### Request example

`GET /:id/snapshot_policy`

#### Parameters

##### Path parameters

`:id` string

The id of cluster to fetch the time series data

#### Example Response

```json
{
  "clusterId": "123e4567-e89b-12d3-a456-426655440000",
  "name": "ProjectX_Daily",
  "directory": "prod/bucket",
  "scheduleType": "daily",
  "timezone": "America/Toronto",
  "scheduleTime": "07:00",
  "scheduleDays": [
      2,
      3,
      4
  ],
  "snapshotRetentionPolicy": "auto",
  "snapshotRetentionDuration": 99,
  "snapshotRetentionType": "day",
  "enableLockedSnapshot": false,
  "enablePolicy": true
}
```

---

### Update cluster's snapshot policy

#### Request example

`PUT /:id/snapshot_policy`

#### Parameters

##### Path parameters

`:id` string

The id of cluster to fetch the time series data

#### Example payload

```json
{
  "name": "ProjectX_Daily",
  "directory": "prod/bucket",
  "scheduleType": "daily",
  "timezone": "America/Toronto",
  "scheduleTime": "07:00",
  "scheduleDays": [
      2,
      3,
      4
  ],
  "snapshotRetentionPolicy": "auto",
  "snapshotRetentionDuration": 99,
  "snapshotRetentionType": "day",
  "enableLockedSnapshot": false,
  "enablePolicy": true
}
```


#### Example Response

```json
{
  "clusterId": "123e4567-e89b-12d3-a456-426655440000",
  "name": "ProjectX_Daily",
  "directory": "prod/bucket",
  "scheduleType": "daily",
  "timezone": "America/Toronto",
  "scheduleTime": "07:00",
  "scheduleDays": [
      2,
      3,
      4
  ],
  "snapshotRetentionPolicy": "auto",
  "snapshotRetentionDuration": 99,
  "snapshotRetentionType": "day",
  "enableLockedSnapshot": false,
  "enablePolicy": true
}
```
