import { Button, Pagination, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

//img, name, role, mes, rep, site, reg
const columns = [
    {
        title: "",
        dataIndex: "image",
        key: "image",
        render: (text: string) => {
            const src = "http://localhost:4444/public/avatars/" + text.split("=")[1];
            return <img src={src} alt="image" style={{ width: "0.1wh", height: "0.1wh" }} />
        },
        width: 100
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 200
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (text: string) => {
            if (text === "Администратор") {
                return (<strong style={{ color: "red" }}>{text}</strong>);
            }
            if (text === "Модератор") {
                return (<strong style={{ color: "green" }}>{text}</strong>);
            }
            if (text === "Игродел") {
                return (<strong style={{ color: "#75078b" }}>{text}</strong>);
            }
            return text
        },
        width: 200
    },
    {
        title: "Messages",
        dataIndex: "messages",
        key: "messages",
        width:100
    },
    {
        title: "reputation",
        dataIndex: "reputation",
        key: "reputation",
        width: 100
    },
    {
        title: "registerDate",
        dataIndex: "registerDate",
        key: "registerDate",
        render: (text: string | number | Date) => {
            return new Date(text).toLocaleDateString("ru-RU");
        },
        width:150
    },
    {
        title: "city/site",
        dataIndex: "city_site",
        key: "city_site",
        width:200
    }
]

function Memberships() {
    const [members, setMembers] = useState([]);
    const [showCount, setShowCount] = useState(10);
    const [usersCount, setUsersCount] = useState(0);

    const [sortTable, setSortTable] = useState({
        sort: "registerDate",
        sortDir: "ASC"
    })

    useEffect(() => {
        document.title = "Memberships";
        axios.get(`http://localhost:4444/users/count`).then((response) => {
            setUsersCount(response.data);
            // alert(response.data);
        })
        handleSetMembers(showCount);
    }, []);

    const handleSetMembers = (limit: number, page: number = 1, sort: string = "registerDate", sortDir: string = "ASC") => {
        axios.get(`http://localhost:4444/users?page=${page}&limit=${limit}&sort=${sort}&sortDir=${sortDir}`).then((response) => {
            setMembers(response.data);
        })
    }

    return (
        <div>
            <h1>Memberships Page</h1>
            <Space direction="vertical">
                <Space>
                    <Button onClick={() => setShowCount(showCount + 10)}>Show more</Button>
                    <Button onClick={() => setShowCount(showCount - 10)}>Show less</Button>
                    <Pagination defaultCurrent={1} total={usersCount}
                        onChange={(page) => handleSetMembers(showCount, page, sortTable.sort, sortTable.sortDir)}
                        
                        />
                </Space>
                <Table dataSource={members} columns={columns} pagination={false} />
            </Space>
        </div>
    );
}

export default Memberships;