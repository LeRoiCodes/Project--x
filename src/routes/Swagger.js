const express = require('express');
const router = express.Router();

//this route is for api documentation using swaggerui

/**
 * @swagger
 * components:
 *     securitySchemes:
 *         bearerAuth:
 *             type: http
 *             scheme: bearer
 *             bearerFormat: JWT
 *     schemas:
 *         User:
 *             type: object
 *             required:
 *                 - firstName
 *                 - lastName
 *                 - email
 *                 - password
 *                 - country
 *                 - isEmployer
 *                 - isGoogle
 *                 - isverified
 *                 - createdAt
 *                 - updatedAt
 *             properties:
 *                 fullname:
 *                      type: string
 *                      description: The full name of the user
 *                 username:
 *                      type: string
 *                      description: The username email of the user
 *                 email:
 *                      type: string
 *                      description: The email of the user
 *                 password:
 *                      type: string
 *                      description: The encrypted password of the user
 *                 country:
 *                      type: string
 *                      description: the country of user
 *                 isEmployer:
 *                      type: boolean
 *                      description: is user an employer or intern
 *                 isGoogle:
 *                      type: boolean
 *                      description: is user sign in from google
 *                 isVerified:
 *                      type: boolean
 *                      description: is user verified
 *             example:
 *                 fullname: June Doe
 *                 username: JuneDoe
 *                 email: junedoe@ymail.com
 *                 password: kdfjd495ubfik49b5ifb3obfo3kf
 *                 country: Nigeria
 *                 isEmployer: true
 *                 isGoogle: true
 *                 isVerified: true
 *
 *     response:
 *         User:
 *             type: object
 *             required:
 *                 - firstName
 *                 - lastname
 *                 - email
 *                 - password
 *                 - country
 *                 - isEmployer
 *                 - isGoogle
 *                 - isverified
 *             properties:
 *                 firstName:
 *                      type: string
 *                      description: User first name
 *                 lastname:
 *                      type: string
 *                      description: User last name
 *                 email:
 *                      type: string
 *                      description: email addresof user
 *                 password:
 *                      type: string
 *                      description: user encrypted password
 *                 country:
 *                      type: string
 *                      description: country of user
 *                 isEmployer:
 *                      type: boolean
 *                      description: is the user an employer
 *                 isGoogle:
 *                      type: boolean
 *                      description: is Sign in from google
 *                 isVerified:
 *                      type: boolean
 *                      description: is user verified after registration
 *         Error:
 *             type: object
 *             properties:
 *                 message:
 *                      type: string
 */

/**
 * @swagger
 * tags:
 *     - name: users
 *       description: The User managing api
 */

/**
 * @swagger
 * /api/user/register:
 *     post:
 *         summary: user creates account
 *         tags:
 *             - users
 *         requestBody:
 *             description: a json with all fields
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/User'
 *         responses:
 *             '201':
 *                description: Created user successfully
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: User already exist
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *             '404':
 *                 description: Please provide all details
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/response/Error'
 * /api/user/register/{code}:
 *      get:
 *         summary: Verify user account
 *         tags:
 *             - users
 *         parameters:
 *             - in: path
 *               name: code
 *               schema:
 *                    type: string
 *                    required: true
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                success:
 *                                    type: boolean
 *                                    description: success bolean.
 *                                token:
 *                                     type: string
 *                                     description: authentication token.
 *             '400':
 *                 description: Invalid Verification Token
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 * /api/v1/user/login:
 *     post:
 *         summary: logs user in
 *         tags:
 *             - users
 *         requestBody:
 *             description: a json with email and password
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                          type: object
 *                          required:
 *                              - email
 *                              - password
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  description: The email of the user
 *                              password:
 *                                  type: string
 *                                  description: The encrypted password of the user
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                success:
 *                                    type: boolean
 *                                    description: success bolean.
 *                                token:
 *                                     type: string
 *                                     description: authentication token
 *             '401':
 *                 description: Invalid credentials
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *             '404':
 *                 description: Please provide an email and password
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/response/Error'
 *
 * /api/user/me:
 *     get:
 *         summary: gets the authenticated user info
 *         security:
 *             - bearerAuth: []
 *         tags:
 *             - users
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            #ref: '#/components/schemas/User
 *             '401':
 *                 description: Not authorized
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *
 *     patch:
 *         summary: update the authenticated user info
 *         security:
 *             - bearerAuth: []
 *         tags:
 *             - users
 *         requestBody:
 *             description: a json with email and password
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                          type: object
 *                          required:
 *                              - firstName
 *                              - lastName
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  description: first name of the user
 *                              password:
 *                                  type: string
 *                                  description: last name of the user
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            #ref: '#/components/schemas/User
 *             '404':
 *                 description: User not found
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *
 * /api/v1/user/forgotpassword:
 *      post:
 *         summary: forgot password reset
 *         tags:
 *             - users
 *         requestBody:
 *             description: a json with email
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                          type: object
 *                          required:
 *                              - email
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  description: The email of the user
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                success:
 *                                    type: boolean
 *                                    description: success bolean.
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '404':
 *                 description: User does not exist
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *             '500':
 *                 description: Internal server error
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/response/Error'
 *
 * /api/v1/user/resetpassword/{resettoken}:
 *      put:
 *         summary: forgot password reset
 *         tags:
 *             - users
 *         parameters:
 *             - in: path
 *               name: resettoken
 *               schema:
 *                    type: string
 *                    required: true
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                success:
 *                                    type: boolean
 *                                    description: success bolean.
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: Invalid Token
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 */


module.exports = router;
