# Todo List API - Gereksinimler

> Bu doküman, gerçek bir Confluence sayfasının yerine geçen "ihtiyaç dokümanı" örneğidir.
> AI destekli akışta bu sayfa okunur, buradan PBI/Task'lar GitHub Issues'a aktarılır.

## PBI-1: Todo CRUD işlemleri

Kullanıcı todo öğeleri oluşturabilmeli, listeleyebilmeli, görüntüleyebilmeli, güncelleyebilmeli ve silebilmeli.

**Endpoints:**
- `POST /todos` - `{ "title": "..." }` ile yeni todo oluşturur (201)
- `GET /todos` - tüm todoları listeler (200)
- `GET /todos/:id` - id'ye göre todo getirir (200 / 404)
- `PUT /todos/:id` - todo başlığını günceller (200 / 404)
- `DELETE /todos/:id` - todo siler (204 / 404)

### Test Case'ler (TC-1.x)
- TC-1.1: `POST /todos` ile geçerli title gönderildiğinde 201 ve oluşturulan todo döner.
- TC-1.2: `POST /todos` ile title olmadan istek atıldığında 400 döner.
- TC-1.3: `GET /todos` tüm todoları döner.
- TC-1.4: `GET /todos/:id` var olan bir id için todo'yu döner.
- TC-1.5: `GET /todos/:id` olmayan bir id için 404 döner.
- TC-1.6: `PUT /todos/:id` title'ı günceller.
- TC-1.7: `DELETE /todos/:id` todo'yu siler ve 204 döner.
- TC-1.8: `DELETE /todos/:id` olmayan id için 404 döner.

---

## PBI-2: Todo tamamlama durumu

Kullanıcı bir todo'yu tamamlandı / tamamlanmadı olarak işaretleyebilmeli.

**Endpoints:**
- `PATCH /todos/:id/complete` - todo'yu tamamlandı yapar (200 / 404)
- `PATCH /todos/:id/incomplete` - todo'yu tamamlanmadı yapar (200 / 404)

### Test Case'ler (TC-2.x)
- TC-2.1: `PATCH /todos/:id/complete` sonrası todo.completed === true olur.
- TC-2.2: `PATCH /todos/:id/incomplete` sonrası todo.completed === false olur.
- TC-2.3: Olmayan id için her iki endpoint de 404 döner.

---

## PBI-3: Duruma göre filtreleme

Kullanıcı todoları tamamlanma durumuna göre filtreleyebilmeli.

**Endpoints:**
- `GET /todos?completed=true` - sadece tamamlanan todoları döner
- `GET /todos?completed=false` - sadece tamamlanmayan todoları döner
- `GET /todos` (parametresiz) - tüm todoları döner

### Test Case'ler (TC-3.x)
- TC-3.1: `GET /todos?completed=true` sadece `completed: true` olan todoları döner.
- TC-3.2: `GET /todos?completed=false` sadece `completed: false` olan todoları döner.
- TC-3.3: `GET /todos` (filtre yok) tüm todoları döner.
