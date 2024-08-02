# Mock OCR Uploader

Contents:
- Running Instructions
- Summary
- Report (Based On Provided Task Description)

## Running
### Docker

```sh
docker compose up --build
```
### Local Developmenet
Each repository includes the running/development/testing instructions generated by their bootstrap tools.

## Summary
You can go over my work progress in [closed pull requests](https://github.com/iarigby/mock-ocr-uploader/pulls?q=is%3Apr+is%3Aclosed)

Short overview of the tools I used
- Front-End:
    - For bootstrapping: NextJs. The components itself are simple React components.
    - React Testing Library
    - shadcn for easy ui elements (with very little tailwind, first time using it)
- Back-End
    - NestJs
      this was my first time learning/using this framework, so the functionality is as basic as it gets but it was interesting to try it out.

Tools I did not use but would want to mention
- Front-End:
    - I usually I love using Tanstack Query for network requests as it makes error handling and network issue handling much cleaner.
    - Playbook is another library I would add in next as it speeds up the work on css.
- Back-End:
    - In python I had a Rest API tests setup written in the way which would allow running them in unit testing and integration testing environment, and a docker compose setup which would allow integration tests to run very easily as a GitHub action. It does take a bit to set up so I opted in to forego python and use a language/library more relevant for this role
    - Another thing I often do when starting a project is activate OpenAPI (swagger) and use code generation library to get ready-to-use client code for the front-end
- If I had a few more hours, I would add GitHub actions for testing and publishing the docker image for both projects (usually they would be separate repositories)


## Report Based On Task Description
### Requirements
1. Front-End
    - [x] Create a simple React application.
        - 100% of the components on the ocr page are simple react components and do not use any nextjs features. but I used NextJs as bootstrap and the testing library setup were quicker with it.
    - [x] Implement a file upload button that allows users to select an image from their device.
    - [ ] display uploaded image on the front-end
    - [x] Trigger a POST request to a back-end API when the image is uploaded.
    - [x] Display the OCR result returned by the back-end.
        - I also added the "copy to clipboard" button for user friendliness
1. Back-End
    - [x] Implement a mocked back-end that accepts image uploads via a POST request.
    - [x] Randomly send back either a successful response with a mocked OCR result or an unsuccessful response with an informative error code and message.
2. Error Handling
    -  I handle error codes 400 and 500, and display them differently. I also display details for 400. For other codes I have a global handler set up.
    - [x] Identify and handle potential error codes from the back-end
    - [x] Distinguish between handled error codes (e.g., image too large, unsupported file type) and unhandled error codes (e.g., server error).
        - I do this by using custom error classes
    - [x] Display appropriate messages to the user based on the error codes.
3. Optimisations
    - [ ] Consider and implement optimizations to handle large images efficiently (e.g., image compression before upload).
4. User Interface
    - [x] The UI can be rudimentary; no need for fancy designs.
    - [x] Ensure it is functional and user-friendly


### Implementation Details
- [x] Use Create React App or a similar setup to scaffold the React application.
- Display appropriately:
    - [ ] loading indicators
        - I have a small sample on a different page, it works if the data is loading but not if there is a network issue
    - [x] error messages appropriately.
- Back-End
    - [x] Implement the back-end using a state-of-the-art framework of your choice.
    - [x] Use a random function to determine if the response should be successful or an error.
    - [x] Return a mocked OCR result in the case of a successful response.
    - [x] Return error codes such as: 400: Bad Request (e.g., image too large, unsupported file type) 500: Internal Server Error (for general server issues
- Error Handling
    - [x] Ensure front-end handles specific error codes gracefully.
    - [x] Display custom messages for handled errors and a generic message for unhandled errors.

### Bonus Points
- [ ] Implement basic image validation on the front-end (e.g., file type, size)
- [ ] Add comments and documentation for clarity
- [x] Write basic unit tests for both front-end and back-end components.
    - Front-end: React Testing Library was misbehaving
    - Back-end: I only test the root route

