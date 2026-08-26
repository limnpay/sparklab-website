#!/usr/bin/env bash
# Pulls all 24 SparkLab photos from the Manus CDN into ./public/images
# so the production site no longer hot-links a third-party bucket.
set -e

BASE="https://files.manuscdn.com/user_upload_by_module/session_file/310519663096503204"
OUT="public/images"

# Heroes (one per page)
curl -sS -o "$OUT/heroes/home.jpg"          "$BASE/mSjabLfskvmsDpSY.jpg"
curl -sS -o "$OUT/heroes/about.jpg"         "$BASE/ZHgaouaPMcOYBbrr.jpg"
curl -sS -o "$OUT/heroes/about-detail.jpg"  "$BASE/ZhStgQhoAmQOcEjX.jpg"
curl -sS -o "$OUT/heroes/program.jpg"       "$BASE/eAIGaqmdJToovDBU.jpg"
curl -sS -o "$OUT/heroes/students.jpg"      "$BASE/ALJubIxaAqIgICoH.jpg"
curl -sS -o "$OUT/heroes/students-detail.jpg" "$BASE/yXcGvIoCzcHeQlbQ.jpg"
curl -sS -o "$OUT/heroes/schools.jpg"       "$BASE/rJgMFWikhOLoazLq.jpg"
curl -sS -o "$OUT/heroes/schools-detail.jpg" "$BASE/CKgwvROQpJfjOhJW.jpg"
curl -sS -o "$OUT/heroes/mentors.jpg"       "$BASE/uErtWNAKCxRHYEpp.jpg"
curl -sS -o "$OUT/heroes/competition.jpg"   "$BASE/MWNwIYmIjlqrlMVc.jpg"

# Gallery (home)
curl -sS -o "$OUT/gallery/01-pitch-stage.jpg"         "$BASE/GUardqukcXWIPWJK.jpg"
curl -sS -o "$OUT/gallery/02-mentor-collab.jpg"       "$BASE/YxquwaUrNCZAfWZe.jpg"
curl -sS -o "$OUT/gallery/03-judges-evaluating.jpg"   "$BASE/caQirMgKnUxUsZIh.jpg"
curl -sS -o "$OUT/gallery/04-lecture-hall.jpg"        "$BASE/NGAaSoSQKvtdyCBC.jpg"

# Audience cards (home)
curl -sS -o "$OUT/audiences/students.jpg"  "$BASE/ZivuPckgeBmijEym.jpg"
curl -sS -o "$OUT/audiences/schools.jpg"   "$BASE/zlnSsPKTbxmMDZVV.jpg"
curl -sS -o "$OUT/audiences/mentors.jpg"   "$BASE/nImKTlGofZgPsEMS.jpg"
curl -sS -o "$OUT/audiences/sponsors.jpg"  "$BASE/nLMgrCIsalrkdWFN.jpg"

# Program preview + competition highlight (home)
curl -sS -o "$OUT/program/team-presenting.jpg" "$BASE/fiRvvKJKYULSmKQj.jpg"
curl -sS -o "$OUT/program/stage-pitch.jpg"     "$BASE/yOnhpumqEGLatfns.jpg"

# 2025 winners (competition page)
curl -sS -o "$OUT/winners/group-on-stage.jpg" "$BASE/RftAKQoVgSmGAQnu.jpg"
curl -sS -o "$OUT/winners/1st.jpg"            "$BASE/MBYzJsatXCRSsALh.jpg"
curl -sS -o "$OUT/winners/2nd.jpg"            "$BASE/eupfCjkzjZAiHwya.jpg"
curl -sS -o "$OUT/winners/3rd.jpg"            "$BASE/vNUWHwSwXJsTlWWm.jpg"

echo "Downloaded $(find $OUT -type f | wc -l | xargs) images into $OUT"
