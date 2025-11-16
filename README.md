## Example Application: TodoList

This is an example Java 21/PostgreSQL project with React/Typescript frontend for a todo list application.

### Prerequisites
This project runs on Java 21 and Gradle 8.10. Verify your setup:
```aiignore
gradle --version
java --version
```
If the Java version doesn't match, ensure you have IntelliJ Ultimate set up to use the correct version:
```aiignore
file -> project structure
Select Java version 21, from vendor Amazon Coretto. Apply and confirm settings.
```
Wait for IntelliJ to download Java 21, and from the command line, find the installation path using ```/usr/libexec/java_home -V```. Open ```~/.gradle/gradle.properties``` in a text editor, and add this line:
```aiignore
org.gradle.java.home={INSERT_PATH_FROM_COMMAND}
```
Now verify and run:
```aiignore
# Stops any running Gradle daemons
gradle --stop
# Should now use Java 21
gradle --version
```
### Running Locally
From project root, run ```docker-compose -f docker-compose.yml up -d```.
> To shut down, run ```docker-compose -f docker-compose.yml down -v```.

### Build and Run the Backend
From backend/, run ```./gradlew bootRun```
> To delete build files, run ```./gradlew clean```

### Run the Frontend
```aiignore
yarn start
```


