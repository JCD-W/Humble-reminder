# Explanations
The reason of why I took certain decitions during the development of this project.
> Why is for a single user?

For the sake of simplicity and to speed up development, however the support for multiple users could be added.
> Why there is not email authentification?

A functional email system would require sensitive credentials or manual setup, so it was scrapped even though it makes the flow less seamless.
> Why entities in the databse switch to a "deleted" status instead of being erased?

For traceability reasons and to avoid conflicts with bridge tables in the database. 