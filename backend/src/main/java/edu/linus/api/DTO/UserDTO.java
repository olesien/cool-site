package edu.linus.api.DTO;

public class UserDTO {
    Integer id;
    String username;

    String password;


    Integer user_role;

    Boolean isAdmin;

    public UserDTO(Integer id, String username, String password, Integer user_role, Boolean isAdmin) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.user_role = user_role;
        this.isAdmin = isAdmin;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getUser_role() {
        return user_role;
    }

    public void setUser_role(Integer user_role) {
        this.user_role = user_role;
    }


    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }
}
