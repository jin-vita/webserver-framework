module.exports = {
  student_list: {
    sql: `select id, name, age, mobile
          from test.student`,
    count: `select count(*) as total
            from test.student`,
    where: `where #`,
    order: `order by #`,
    page: `limit #`,
  },
  student_insert: {
    sql: `insert into test.student
            (name, age, mobile) 
          values
            (:name, :age, :mobile)`,
  },
};
