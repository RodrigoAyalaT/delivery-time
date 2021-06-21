db.createUser(
    {
        user: "ekids",
        pwd: "Am3RpojNoofM8mb2",
        roles: [ { role: "readWrite", db: "ekids"} ],
        passwordDigestor: "server",
    }
)
