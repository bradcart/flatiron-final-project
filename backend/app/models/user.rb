class User < ApplicationRecord
    has_secure_password
    has_many :projects
    has_many :pages

    validates :username, presence: true, uniqueness: true
end
