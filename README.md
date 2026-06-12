# Demo: AI Destekli PBI -> Geliştirme -> Test -> Deployment Akışı

Bu repo, aşağıdaki akışın uçtan uca bir demo'sudur (Confluence yerine `docs/requirements.md` ve GitHub Issues kullanılmıştır):

1. **Gereksinimler** - [docs/requirements.md](docs/requirements.md) içinde PBI'lar ve test case'ler tanımlıdır.
2. **PBI/Task yönetimi** - GitHub Issues üzerinde her PBI bir issue, test case'ler issue açıklamasında listelenir.
3. **Geliştirme** - `src/` altında Todo List API (Express).
4. **Test** - `tests/` altında Jest + Supertest ile her test case bire bir test'e karşılık gelir (`npm test`).
5. **Bug/Done akışı** - Test başarısız olursa ilgili PBI issue'una bağlı bir "bug" issue açılır; tüm testler geçince PBI issue'u kapatılır (Done).
6. **Deployment** - `.github/workflows/ci.yml` main branch'e push'ta testleri çalıştırır, geçerse dummy bir deploy adımı tetiklenir.

## Çalıştırma

```bash
npm install
npm test
npm start
```

## API

| Method | Path                  | Açıklama                    |
|--------|-----------------------|------------------------------|
| GET    | /todos                | Tüm todoları listeler        |
| GET    | /todos?completed=true | Tamamlanan todoları listeler |
| POST   | /todos                | Yeni todo oluşturur          |
| GET    | /todos/:id            | Todo getirir                 |
| PUT    | /todos/:id            | Todo başlığını günceller     |
| DELETE | /todos/:id            | Todo siler                   |
| PATCH  | /todos/:id/complete   | Tamamlandı işaretler         |
| PATCH  | /todos/:id/incomplete | Tamamlanmadı işaretler       |
