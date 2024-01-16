import { http } from "@/api_servers/http";

export function getPresetDatabases() {
  return http("/", {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  });
}

export function createDatabaseSession(data) {
  return http("/", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(data),
  });
}

export function closeDatabaseSession(session) {
  return http('/', {
    method: 'DELETE',
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
    body: JSON.stringify({session}),
  })
}

export function getCurrentDatabaseTableStructure(session, table) {
  let url = '/' + `?session=${session}&table=${table}`
  return http(url)
}

export function getCurrentDatabaseTableData(session, table, page, pageSize) {
  let url = '/' + `?session=${session}&table=${table}&page=${page}&pageSize=${pageSize}`
  return http(url)
}