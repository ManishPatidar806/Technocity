package org.company.companywebsite.Model.Response;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ApiResponse<T> {
private String message;
private String status;
private T data;

public ApiResponse(String status, String message, T data) {
    this.message = message;
    this.status = status;
    this.data = data;
}
ApiResponse(String status,String message ) {
    this.message = message;
    this.status = status;
}
ApiResponse(String message) {
    this.message = message;
}
public ApiResponse() {
}


}
