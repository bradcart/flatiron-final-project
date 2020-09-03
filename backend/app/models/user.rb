class User < ApplicationRecord
    has_secure_password
    has_many :templates
    has_many :pages
end
