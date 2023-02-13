module.exports = {
  user_list: {
    sql: `select *
          from test.user`,
    count: `select count(*) as total
            from test.student`,
    where: `where #`,
    order: `order by #`,
    page: `limit #`,
  },
  user_insert: {
    sql: `insert into test.user
            (id, password, name, age, mobile, email, create_date, modify_date) 
          values
            (:id, :password, :name, :age, :mobile, :email, now(), now())`,
  },
};
