## Test graphql
http://127.0.0.1:8080/
http://127.0.0.1:8080/graphql
http://127.0.0.1:8080/graphql/schema.json

http://127.0.0.1:8080/graphql_manual

## HTTP header для graphql-playground
    {"Authorization": "Basic admin admin"}
    В параметрах надо установить:
        "request.credentials": "include"
        "tracing.hideTracingResponse": false

## Список всех производителей и моделей
    {manufacturers{name, description, carModels{name, description}}}

## Добавление нового производителя
    {manufacturerNew(new: {name: "Toyota", description: "Toyota description"}) {id, name, description}}
    {manufacturerNew(new: {name: "Honda", description: "Honda description"}) {id, name, description}}

## Добавление новых моделей
    {carModelNew(manufacturer: "Toyota", new: {name: "Avensis", description: ""}) {id, name, description}}
    {carModelNew(manufacturer: "Toyota", new: {name: "Camry", description: ""}) {id, name, description}}
    {carModelNew(manufacturer: "Toyota", new: {name: "Corolla", description: ""}) {id, name, description}}

## Выбор одного производителя по имени
    {manufacturer(name: "Toyota"){name, description, carModels{name, description}}}

## Выбор определенной модели одного производителя по имени
    {manufacturer(name: "Toyota"){name, description, carModel(name: "Avensis"){name, description}}}


## Удаление производителя
    {manufacturer(name:"Honda"){delete(confirm:SURE)}}

## Изменение описания для производителя
    fragment ManufacturerFields on Manufacturer{id, name, description}
    query updateManufacturerDescription($name: String, $description: String){
      manufacturer(name: $name){
        ...ManufacturerFields
        update(update:{
          description: $description
        }){
          ...ManufacturerFields
        }
      }
    }
    {"name": "Toyota", "description": "Description CCC"}


## CACHE
    fragment CacheConfigurationFields on CacheConfiguration{
      timeToIdleSeconds, timeToLiveSeconds,
      maxBytesLocalHeap, maxBytesLocalOffHeap, maxBytesLocalDisk,
      maxEntriesInCache, maxEntriesLocalHeap, maxEntriesLocalDisk
    }
    fragment CacheStatisticsFields on CacheStatistics{
      localHeapSize, localOffHeapSize, localDiskSize,
      localHeapSizeInBytes, localOffHeapSizeInBytes, localDiskSizeInBytes
    }
    {
      cachies{
        name
        configuration{...CacheConfigurationFields}
        statistics{...CacheStatisticsFields}
      }
    }
