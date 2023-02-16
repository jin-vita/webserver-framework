module.exports = {
    user_list: {
        sql: `select *
              from test.user`,
        count: `select count(*) as total
                from test.user`,
        where: `where #`,
        order: `order by #`,
        page: `limit #`,
    },
    user_insert: {
        sql: `insert into test.user
                  (email, password, name, age, mobile, create_date, modify_date)
              values (:email, :password, :name, :age, :mobile, now(), now())`,
    },
};
