## Список всех производителей
    {manufacturers{name, description, carModels{name, description}}}

## Выбор одного производителя по имени
    {manufacturer(name: "Toyota"){name, description}}

## Выбор определенной модели одного производителя по имени
    {manufacturer(name: "Toyota"){name, description, carModel(name: "Avensis"){name, description}}}

## Добавление нового производителя
    {
      manufacturerNew(new: {
        name: "Honda"
        description: "Honda description"
      }) {id}
    }

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
