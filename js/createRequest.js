"use strict"

function createRequest(request) {
  const xhr = new XMLHttpRequest;
  xhr.open(request.method, request.url);
  if (request.responseType) {
    xhr.responseType = request.responseType;
  }
  xhr.setRequestHeader(request.setRequestHeader.header, request.setRequestHeader.headerValue);
  // try {
  //   xhr.send(request.event);
  // } catch (error) {
  //   const err = new Error('Request Error');
  //   return err
  // }
  xhr.send(request.event);
  return xhr
}
