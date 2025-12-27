const Index = () => {
  return (
    <div style={styles.container}>
      <h1>Beauty Care Products</h1>
      <p>Welcome to our platform</p>

      <div style={styles.buttons}>
        <button style={styles.btn}>Login</button>
        <button style={styles.btnOutline}>Register</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  buttons: {
    display: "flex",
    gap: "15px",
  },
  btn: {
    padding: "10px 25px",
    background: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  btnOutline: {
    padding: "10px 25px",
    background: "#fff",
    border: "1px solid #000",
    cursor: "pointer",
  },
};

export default Index;
