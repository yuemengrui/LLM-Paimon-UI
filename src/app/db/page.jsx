"use client";

import { Fragment, useEffect, useState } from "react";
import { closeDatabaseSession, createDatabaseSession, getPresetDatabases } from "@/api_servers/db";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import TableStructure from './TableStructure'
import TableData from './TableData'

const custom = {
  name: "自定义连接",
  value: "custom",
};

const test = {
  name: "ff",
  value: "xx",
};
export default function Page() {
  const [presetDatabases, setPresetDatabases] = useState([test, custom]);

  const [db, setDB] = useState("custom");
  const [ip, setIp] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [port, setPort] = useState("3306");

  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState("");

  async function handleDatabaseSessionClose() {
    try {
      
      const done = await closeDatabaseSession(session)
      if(done) {
        setSession('')
      }
    } catch (error) {
      
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      db,
    };
    if (db === "custom") {
      payload.ip = ip;
      payload.user = user;
      payload.password = password;
      payload.port = port;
    }
    try {
      setLoading(true);
      const res = await createDatabaseSession(payload);
      if (res) {
        // TODO: 链接成功
        setSession(res);
      } else {
        // TODO: 异常处理
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getPresetDatabases()
      .then((res) => {
        // TODO: 获取默认数据库
        setPresetDatabases([...res, custom]);
      })
      .catch(() => "xxx");
  }, []);
  return (
    <div className="flex w-full bg-blue-50/30">
      {session ? (
        <div className="mx-auto">
          <div className="mb-2">
            <div>当前链接：<span className="text-blue-500 underline mx-2">{session}</span> <button className="" onClick={handleDatabaseSessionClose}>关闭</button></div>
          </div>
          <Tabs>
            <TabList>
              <Tab>对话</Tab>
              <Tab>表结构</Tab>
              <Tab>表数据</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <TableStructure />
              </TabPanel>
              <TabPanel>
                <TableData />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      ) : (
        <div className="mx-auto">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>选择数据库</FormLabel>
              <Select value={db} onChange={(e) => setDB(e.target.value)}>
                {presetDatabases.map((db) => (
                  <option key={db.value} value={db.value}>
                    {db.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {db == "custom" && (
              <Fragment>
                <FormControl>
                  <FormLabel>IP</FormLabel>
                  <Input value={ip} onChange={(e) => setIp(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>用户</FormLabel>
                  <Input
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>密码</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>端口</FormLabel>
                  <Input
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                  />
                </FormControl>
              </Fragment>
            )}
            <Button mt={4} isLoading={loading} type="submit">
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
