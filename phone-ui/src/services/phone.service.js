import http from "../http-common";

class PhoneDataService {
  getAll() {
    return http.get("/phone");
  }

  get(id) {
    return http.get(`/phone/${id}`);
  }

  create(data) {
    return http.post("/phone", data);
  }

  update(id, data) {
    return http.put(`/phone/${id}`, data);
  }

  delete(id) {
    return http.delete(`/phone/${id}`);
  }

  deleteAll() {
    return http.delete(`/phone`);
  }

  findByTitle(title) {
    return http.get(`/phone?title=${title}`);
  }
}

export default new PhoneDataService();