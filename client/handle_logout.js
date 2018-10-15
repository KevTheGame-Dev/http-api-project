const logout = () => {
    window.localStorage.removeItem('potluckID');
    window.location = '/';
}