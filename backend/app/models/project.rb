class Project < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :identifier, presence: true
end
