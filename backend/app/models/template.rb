class Template < ApplicationRecord
    belongs_to :user, optional: true
    validates :identifier, presence: true
end
