export const start = async () => {
    const path = require('path');
    await require(path.join(__dirname, 'm000_clear_db')).migration();
    await require(path.join(__dirname, 'm001_add_admin')).migration();
    await require(path.join(__dirname, 'm002_fill_db_with_testdata')).migration();
}
