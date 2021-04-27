const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: { todoList: [{ label: "", done: false }] },
        actions: {
            createUser: () => {
                fetch("https://assets.breatheco.de/apis/fake/todos/user/pehuen", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify([]),
                })
            },

            getData: () => {
                fetch("https://assets.breatheco.de/apis/fake/todos/user/pehuen", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                }).then(
                    data => data.json()
                ).then(
                    request => {
                        if (request.msg){
                            setStore({ todoList: [{ label: "", done: false }] });
                            getActions().createUser();
                        }
                        else
                            setStore({ todoList: request });
                    }
                )

            },
            updateApi: () => {
                fetch("https://assets.breatheco.de/apis/fake/todos/user/pehuen", {
                    method: "PUT",
                    body: JSON.stringify(getStore().todoList),
                    headers: { "Content-Type": "application/json" }
                })
                    .then(request => request.json())
                    .then(data => {
                        console.log("resultado del fetch :", data);
                    })
            },

            addList: (event) => {
                if (event.target.value !== "" && event.key === 'Enter') {
                    setStore({ todoList: getStore().todoList.concat({ label: `${event.target.value}`, done: false }) });
                    event.target.value = "";
                    getActions().updateApi();
                    event.preventDefault();
                }

            },

            deleteTask: (toErase) => {
                if (getStore().todoList.length === 1) {
                    setStore({ todoList: [] });
                    getActions().updateApi();
                }
                console.log(toErase);
                const filterData = getStore().todoList.filter((item, index) => index !== toErase);
                console.log(filterData);
                setStore({ todoList: filterData });
                getActions().updateApi();
            }
        }

    };
}
export default getState;