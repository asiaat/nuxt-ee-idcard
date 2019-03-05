export default function ({ store, redirect }) {
    // If the user is not authenticated
    //if (!store.state.authenticated) {
    if(!isAuth()) {
      return redirect('/login')
    }
  }

  function isAuth() {
      return false;
  }