class Patient < ApplicationRecord
    has_many :addresses, dependent: :destroy
    has_many :custom_fields, dependent: :destroy
    enum status: { inquiry: 0, onboarding: 1, active: 2, churned: 3 }
end